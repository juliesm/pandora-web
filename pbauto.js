/* Pandoras Box Automation - JavaScript.NodeJS TESTING @2016-11-28 <support.pandorasbox@christiedigital.com>

LICENSE:

Pandoras Box SDK Copyright (c) 2016 coolux GmbH - a Christie company
Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be included in all copies
or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
OR OTHER DEALINGS IN THE SOFTWARE.
*/

var net = require('net');

const TCP_PORT = 6211;
const TCP_HEADER_LEN = 17;
const PBAU_SEQUENCE = [80, 66, 65, 85]; // "PBAU" header
const WAIT_FOR_HEADER = -1;

function Tcp(ip, domain=0, cb=null) {
	this._domain = domain;
	this._buffer = [];
	this._queue = [];
	this._msglen = WAIT_FOR_HEADER;
    this._socket = new net.Socket();
    this._socket.on('data', this.OnData.bind(this));
    // this._socket.on('close', function() {});
    this._socket.connect(TCP_PORT, ip, cb);
}

Tcp.prototype.OnData = function(data) {
    // append new data
    // note: this may fail for data larger than ~100k elements
    this._buffer.push(...data);

    // try to process data
    if(this._msglen == WAIT_FOR_HEADER)
    {
        if(this._buffer.length >= TCP_HEADER_LEN)
        {
          var header = this._buffer.splice(0, TCP_HEADER_LEN);
          this._msglen = (header[9] << 8) + header[10];
        }
    }
    
    if(this._msglen != WAIT_FOR_HEADER)
    {
        if(this._buffer.length >= this._msglen)
        {
            let m = new ByteUtil(this._buffer.splice(0, this._msglen));
            let i = this._queue.splice(0, 1)[0];

            this._msglen = WAIT_FOR_HEADER;

            // parse data only if callback is present
            if(i.c !== false)
            {
                let statusCode = m.ReadShort();
                let r = {code:statusCode,ok:statusCode > 0};

                if(r.ok)
                {
                    for (let d=0;d<i.f.length;d++)
                    {
                        r[i.f[d].n] = m["Read" + i.f[d].t]();
                    }
                }
                else
                {
                    // save error code
                    r.code = o.readInt();
                }

                // invoke callback
                i.c(r);
            }
        }
    }
}

Tcp.prototype.Send = function(data, cbinfo = null)
{
    if(cbinfo != null)
    {
        this._queue.push(cbinfo);
    }
	
	var header = [1,				//# + protocol version (byte, currently 1)
                (this._domain >> 24) & 0xFF, //# + domain id (integer) (high)
                (this._domain >> 16) & 0xFF,
                (this._domain >> 8) & 0xFF,
                this._domain & 0xFF, //# domain ID (low)
                (data.length >> 8) & 0xFF, //# + message size (short)
                data.length & 0xFF,
                0, 0, 0, 0, //# + connection id (int, user definable, defaults to 0)
                0, //# + protocol flag (byte, 0 for TCP)
                0, //# checksum
	];
    header[12] = header.reduce(function(a, b) {return a + b;}, 0) % 256;
	this._socket.write(new Buffer(PBAU_SEQUENCE.concat(header, data)));
}

function PbAuto(connector)
{
	this.c = connector;
}

PbAuto.ConnectTcp = function(ip, domain=0, cb=false){
    return new PbAuto(new Tcp(ip, domain, cb));
}

// sample function without return values/response
PbAuto.prototype.ResetAll = function() {
    let msg = new ByteUtil();
    msg.WriteShort(9);
	this.c.Send(msg.GetBytes());
}

PbAuto.prototype.SetDeviceParamDouble = function(siteId, deviceId, parameterName, parameterValue, doSilent, doDirect) {
    let b = new ByteUtil();
    b.WriteShort(84);
    b.WriteInt(siteId);
    b.WriteInt(deviceId);
    b.WriteStringNarrow(parameterName);
    b.WriteDouble(parameterValue);
    b.WriteBool(doSilent);
    b.WriteBool(doDirect);
    this.c.Send(b.GetBytes());
}

PbAuto.prototype.GetDeviceParam = function(siteId, deviceId, parameterName, cb=false) {
    let b = new ByteUtil();
    b.WriteShort(79);
    b.WriteInt(siteId);
    b.WriteInt(deviceId);
    b.WriteStringNarrow(parameterName);
    this.c.Send(b.GetBytes(), {f: [{n: 'ParameterValue', t: 'Double'}], c: cb});
}

/* Base64 only required for HTTP connections
var Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function(t) {for (var e, r, i, o, s, B, n, h = "", a = 0; a < t.length;) e = t[a++], r = t[a++], i = t[a++], o = e >> 2, s = (3 & e) << 4 | r >> 4, B = (15 & r) << 2 | i >> 6, n = 63 & i, isNaN(r) ? B = n = 64 : isNaN(i) && (n = 64), h = h + this._keyStr.charAt(o) + this._keyStr.charAt(s) + this._keyStr.charAt(B) + this._keyStr.charAt(n);return h},
        decode: function(t) {var e, r, i, o, s, B, n, h = new Array,a = 0;for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); a < t.length;) o = this._keyStr.indexOf(t.charAt(a++)), s = this._keyStr.indexOf(t.charAt(a++)), B = this._keyStr.indexOf(t.charAt(a++)), n = this._keyStr.indexOf(t.charAt(a++)), e = o << 2 | s >> 4, r = (15 & s) << 4 | B >> 2, i = (3 & B) << 6 | n, h.push(e), 64 != B && h.push(r), 64 != n && h.push(i);return h}
    };
/**/

var PBU_BYTES_MIN_SHORT = -Math.pow(2, 15);
var PBU_BYTES_MAX_SHORT = -1 * PBU_BYTES_MIN_SHORT - 1;
var PBU_BYTES_MIN_INT = -Math.pow(2, 31);
var PBU_BYTES_MAX_INT = -1 * PBU_BYTES_MIN_INT - 1;
var PBU_BYTES_MAX_DOUBLE_EXP = 2047;
var PBU_BYTES_DOUBLE_EXP_BIAS = PBU_BYTES_MAX_DOUBLE_EXP >> 1;

function ByteUtil(data = false) {
    this._bytes = (data === false) ? [] : this._bytes = data.slice(0, data.length);
    this._pos = 0;
};

ByteUtil.prototype.GetBytes = function() {return this._bytes;};

ByteUtil.prototype.WriteBool = function(t) {this._bytes.push(t ? 1 : 0)};
ByteUtil.prototype.WriteByte = function(t) {this._bytes.push(t)};
ByteUtil.prototype.WriteShort = function(v){this._bytes.push((v >> 8) & 0xFF);this._bytes.push(v & 0xFF);};
ByteUtil.prototype.WriteInt = function(v){this._bytes.push((v >> 24) & 0xFF);this._bytes.push((v >> 16) & 0xFF);this._bytes.push((v >> 8) & 0xFF);this._bytes.push(v & 0xFF);};
ByteUtil.prototype.WriteDouble = function(t) {var e, r, i, o = 0 > t ? 1 : 0;t = Math.abs(t), isNaN(t) || 1 / 0 == t ? (r = isNaN(t) ? 1 : 0, e = PBU_BYTES_MAX_DOUBLE_EXP) : (e = Math.floor(Math.log(t) / Math.LN2), t * (i = Math.pow(2, -e)) < 1 && (e--, i *= 2), t * i >= 2 && (e++, i /= 2), e + PBU_BYTES_DOUBLE_EXP_BIAS >= PBU_BYTES_MAX_DOUBLE_EXP ? (r = 0, e = PBU_BYTES_MAX_DOUBLE_EXP) : e + PBU_BYTES_DOUBLE_EXP_BIAS >= 1 ? (r = (t * i - 1) * Math.pow(2, 52), e += PBU_BYTES_DOUBLE_EXP_BIAS) : (r = t * Math.pow(2, PBU_BYTES_DOUBLE_EXP_BIAS - 1) * Math.pow(2, 52), e = 0));var s = this._bytes.length,B = 52,n = 0;for (n = 0; B >= 8; B -= 8) this._bytes[s + n] = 255 & r, n++, r /= 256;var h = 11 + B;for (e = e << B | r; h > 0; h -= 8) this._bytes[s + n] = 255 & e, n++, e /= 256;this._bytes[s + n - 1] |= 128 * o};
ByteUtil.prototype.WriteStringNarrow = function(t) {var e = t.length;this.WriteShort(e);for (var r = this._bytes.length, i = 0; e > i; i++) this._bytes[r + i] = t.charCodeAt(i)};
ByteUtil.prototype.WriteStringWide = function(t) {var e = t.length;this.WriteShort(e);for (var r = 0; e > r; r++) this.WriteShort(t.charCodeAt(r))};
ByteUtil.prototype.WriteByteBuffer = function(t) {var e = t.length;this.WriteInt(e);for (var r = 0; e > r; r++) this._bytes.push(t[r])};
ByteUtil.prototype.WriteIntBuffer = function(t) {var e = t.length;this.WriteInt(e);for (var r = 0; e > r; r++) this.WriteInt(t[r])};

ByteUtil.prototype.ReadBool = function() {return this._bytes[this._pos++] == 0;};
ByteUtil.prototype.ReadByte = function() {return this._bytes[this._pos++];};
ByteUtil.prototype.ReadShort = function() {for (var t = 0, e = 1, r = 1; r >= 0; r--) t += this._bytes[this._pos + r] * e, e *= 256;return t & -PBU_BYTES_MIN_SHORT && (t += 2 * PBU_BYTES_MIN_SHORT), this._pos += 2, t};
ByteUtil.prototype.ReadInt = function() {for (var t = 0, e = 1, r = 3; r >= 0; r--) t += this._bytes[this._pos + r] * e, e *= 256;return t & -PBU_BYTES_MIN_INT && (t += 2 * PBU_BYTES_MIN_INT), this._pos += 4, t};
ByteUtil.prototype.ReadDouble = function() {var t = 0,e = 7,r = this._bytes[this._pos + e];e--;var i = -7,o = 127 & r;for (r >>= 7, i = 4; i > 0; i -= 8) o = 256 * o + this._bytes[this._pos + e], e--;var s = o & (1 << -i) - 1;for (o >>= -i, i += 52; i > 0; i -= 8) s = 256 * s + this._bytes[this._pos + e], e--;switch (o) {case 0:o = 1 - PBU_BYTES_DOUBLE_EXP_BIAS;break;case PBU_BYTES_MAX_DOUBLE_EXP:return t = s ? 0 / 0 : 1 / 0 * (r ? -1 : 1), this._pos += 8, t;default:s += Math.pow(2, 52), o -= PBU_BYTES_DOUBLE_EXP_BIAS}return t = (r ? -1 : 1) * s * Math.pow(2, o - 52), this._pos += 8, t};
ByteUtil.prototype.ReadStringNarrow = function() {for (var t = this.readShort(), e = new Array, r = 0; t > r; r++) e[r] = String.fromCharCode(this._bytes[this._pos]), this._pos++;return e.join("")};
ByteUtil.prototype.ReadStringWide = function() {for (var t = this.readShort(), e = new Array, r = 0; t > r; r++) e[r] = String.fromCharCode(this.readShort());return e.join("")};
ByteUtil.prototype.ReadByteBuffer = function() {for (var t = this.readInt(), e = new Array, r = 0; t > r; r++) e[r] = this._bytes[this._pos], this._pos++;return e};
ByteUtil.prototype.ReadIntBuffer = function() {for (var t = this.readInt(), e = new Array, r = 0; t > r; r++) e[r] = this.readInt();return e};

module.exports = PbAuto;
