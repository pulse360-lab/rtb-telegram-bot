#!/bin/bash

#usage ./git_setup.sh <user@email>
email=$1
name=${email%%@*}

git config --global user.email "${email}"
git config --global user.name "${name}"
git config --global credential.helper cache
