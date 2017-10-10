from pbautobox import pbauto

#Use TCP connector
ip = "10.45.114.39"
domain = 0
port=6211
#port=51015

pb = pbauto.PBAuto.connect_tcp(ip, port, domain)

#print(pb.get_param(2, 7, 'Opacity'))
#print(pb.get_media_info_by_dmx_id(1,10))

print(pb.get_media_info_by_tree_item_index(2))
print(pb.get_media_height_by_dmx_id(1,10))

#try:
#	print(pb.get_thumbnail_by_item_index(5))
#except(IndexError):
#	print("Huh, this was an IndexError")


