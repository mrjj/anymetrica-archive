
# 2. Add the package repositories
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-container-runtime/$distribution/nvidia-container-runtime.repo | \
  sudo tee /etc/yum.repos.d/nvidia-container-runtime.repo

#Clone the repos as follows (executed as root)
#Fedora 29
#docker-ce version 18.09.3, build 774a1f4
#https://github.com/NVIDIA/nvidia-docker/issues/706
LOCALDIR=/var/lib/nvidia-docker-repo
DOCKER_VERSION='18.09.3'
NVIDIA_DOCKER_VERSION='2.0.3'
mkdir -p $LOCALDIR && cd $LOCALDIR
git clone -b gh-pages https://github.com/NVIDIA/libnvidia-container.git
git clone -b gh-pages https://github.com/NVIDIA/nvidia-container-runtime.git
git clone -b gh-pages https://github.com/NVIDIA/nvidia-docker.git

rpm --import $LOCALDIR/nvidia-docker/gpgkey
rpm -i libnvidia-container/centos7/x86_64/libnvidia-container1-1.0.0-0.1.beta.1.x86_64.rpm
rpm -i libnvidia-container/centos7/x86_64/libnvidia-container-tools-1.0.0-0.1.beta.1.x86_64.rpm
rpm -i nvidia-container-runtime/centos7/x86_64/nvidia-container-runtime-hook-1.3.0-1.x86_64.rpm
rpm -i nvidia-container-runtime/centos7/x86_64/nvidia-container-runtime-2.0.0-1.docker${DOCKER_VERSION}.x86_64.rpm
rpm -i nvidia-docker/centos7/x86_64/nvidia-docker2-${NVIDIA_DOCKER_VERSION}-1.docker${DOCKER_VERSION}.ce.noarch.rpm

sudo pkill -SIGHUP dockerd
docker run --runtime=nvidia --rm nvidia/cuda nvidia-smi

#docker-ce-18.06.0.ce-3.el7.x86_64
#nvidia-container-runtime-hook-1.4.0-1.x86_64
#libnvidia-container-tools-1.0.0-0.1.rc.2.x86_64
#nvidia-container-runtime-2.0.0-1.docker18.06.0.x86_64
#libnvidia-container1-1.0.0-0.1.rc.2.x86_64
#{
#    "storage-driver": "devicemapper",
#    "storage-opts": [
#    "dm.thinpooldev=/dev/mapper/docker-thinpool",
#    "dm.basesize=100G",
#    "dm.use_deferred_removal=true",
#    "dm.use_deferred_deletion=true"
#    ],
#    "runtimes": {
#        "nvidia": {
#            "path": "/usr/bin/nvidia-container-runtime",
#            "runtimeArgs": []
#        }
#    }
#}

https://github.com/NVIDIA/nvidia-docker#centos-7-docker-rhel-7475-docker
# If you have nvidia-docker 1.0 installed: we need to remove it and all existing GPU containers
docker volume ls -q -f driver=nvidia-docker | xargs -r -I{} -n1 docker ps -q -a -f volume={} | xargs -r docker rm -f
sudo yum remove nvidia-docker

# Add the package repositories
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-container-runtime/$distribution/nvidia-container-runtime.repo | \
  sudo tee /etc/yum.repos.d/nvidia-container-runtime.repo

# Install the nvidia runtime hook
sudo yum install -y nvidia-container-runtime-hook

# Test nvidia-smi with the latest official CUDA image
# You can't use `--runtime=nvidia` with this setup.
docker run --rm nvidia/cuda:9.0-base nvidia-smi
