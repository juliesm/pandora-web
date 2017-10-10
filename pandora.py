
import sys, json

from pbautobox import pbauto

#Use TCP connector
ip = "10.45.114.39"
domain = 1
port=6211

pb = pbauto.PBAuto.connect_tcp(ip, port, domain)

def main():

	objList = []
	count = sys.stdin.read()

	treeCount = pb.get_tree_item_count()
	if(treeCount['treeItemCount'] > 35):
		for i in list(range(2,int(count)+1)):
			object = pb.get_media_info_by_tree_item_index(i)
			print(json.dumps(object))
			sys.stdout.flush()
    
#start process
if __name__ == '__main__':
    main()


