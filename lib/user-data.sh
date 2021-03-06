#!/bin/bash -xe
exec > >(tee /var/log//user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

# sudo su 
yum update -y 
yum install git -y
yum install pip3 -y

cd /home/ec2-user/
git clone  https://github.com/guming3d/TSP-workshop-Original.git
chown -R ec2-user /home/ec2-user/TSP-workshop
cd TSP-workshop
pip3 install -r requirements.txt
python3 source/flask_app.py
