from django.shortcuts import render

from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework.parsers import JSONParser
from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import *
from rest_framework.permissions import *




import cv2, os
import numpy as np
#import matplotlib.pyplot as plt
import hashlib



def handle_uploaded_file(post_file_handler, path):

    directory = path.rsplit('/', 1)[0]
    
    if not os.path.exists(directory):
        os.makedirs(directory)    
    with open(path, 'wb+') as destination:
        for chunk in post_file_handler.chunks():
            destination.write(chunk)
        destination.close()


@api_view(['POST',])
@renderer_classes((JSONRenderer,))
@permission_classes((AllowAny,))
def get_diamond_hash(request):

	coordinate_hash = ""
	coordinate_string = ""

	for key in request.FILES.keys():
	 	filename = request.FILES[key].name
		handle_uploaded_file(request.FILES[key], "./"+filename)
	
		img = cv2.imread(filename)
		gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)

		gray = np.float32(gray)
		dst = cv2.cornerHarris(gray,2,3,0.15)

		#result is dilated for marking the corners, not important
		#dst = cv2.dilate(dst,None)

		# Threshold for an optimal value, it may vary depending on the image.
		#img[dst>0.05*dst.max()]=[0,0,255]

		out=dst>0.02*dst.max()
		l=[]
		for i in range(0,out.shape[0]):
		    for j in range(0,out.shape[1]):
		        if (out[i,j]==True):
		            l.append(tuple([i,j]))

		coordinate_string = str(l).strip('[]')
		
		hash_object = hashlib.sha256(coordinate_string.encode())
		coordinate_hash = hash_object.hexdigest()

	return Response(dict({'coordinate_string': coordinate_string, 'coordinate_hash': coordinate_hash}))
