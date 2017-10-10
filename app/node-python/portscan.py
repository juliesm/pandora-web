import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)


for port in range(1304, 65535):
	try:
		sock.connect(('10.45.114.43', port))
		print("Port worked ", port)

	except ConnectionRefusedError:
		next
		#print("Port refused ", port)
