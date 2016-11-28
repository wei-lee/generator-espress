#!/bin/sh
# PostInstall Script for <%= projectName %>

# Service Management (root only)
if [ "$(id -u)" = "0" ]; then
 OSNAME=`uname -s`
 case $OSNAME in
  Linux)
   echo "Installing Service Control Scripts"
   cp ./scripts/<%= projectName %> /etc/init.d
   cp ./scripts/<%= projectName %>-launcher.sh /usr/local/bin
   echo Initialising - update-rc.d <%= projectName %> defaults 80
   update-rc.d <%= projectName %> defaults 80
  ;;
  *)
   # Reserved for future use
  ;;
 esac
fi
