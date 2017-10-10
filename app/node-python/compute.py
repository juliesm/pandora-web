## compute.py

##import sys, json as np

#Read data from stdin
#def read_in():
    #lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    #return json.loads(lines[0])

#def main():
    #get our data as an array from read_in()
    #lines = read_in()

 #   data = "Panda"
    #return the sum to the output stream
  #  print(data)
    
   # sys.stdout.flush()

#start process
#if __name__ == '__main__':
 #   main()



## compute.py

import sys, json, numpy as np

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def main():
    #get our data as an array from read_in()
    lines = read_in()

    #sum them up
    total_sum_inArray = 0
    for item in lines:
            total_sum_inArray += item

    #return the sum to the output stream
    print(total_sum_inArray)
