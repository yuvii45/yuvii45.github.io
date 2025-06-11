import cv2
import numpy as np

grayscale_ratio = 0.3
img = cv2.imread("/home/yuvraj/yuvii45.github.io/images/blue_cover.jpg")

h, w = img.shape[:2]
gray_part = cv2.cvtColor(img[:, :int(w*grayscale_ratio)], cv2.COLOR_BGR2GRAY)
gray_part_bgr = cv2.cvtColor(gray_part, cv2.COLOR_GRAY2BGR)  # convert back to 3 channels

color_part = img[:, int(w*grayscale_ratio):]

final_img = np.hstack((gray_part_bgr, color_part))
cv2.imwrite("images/mixed.jpg", final_img)
