#!/bin/bash

sudo su
yum update -y
yum install git
yum install pip3

cd /home/ec2-user/
git clone  https://github.com/AoyuQC/TSP-workshop.git
cd TSP-workshop
pip3 install -r requirements.txt
python3 source/flask_app.py
