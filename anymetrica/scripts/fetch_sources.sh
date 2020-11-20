#!/usr/bin/env bash
rm -rf ./ffmpeg_sources.old
mv -f ./ffmpeg_sources ./ffmpeg_sources.old
mkdir -p ./ffmpeg_sources
pushd ./ffmpeg_sources
  wget http://downloads.sourceforge.net/project/lame/lame/3.99/lame-3.99.5.tar.gz
  wget http://downloads.xiph.org/releases/ogg/libogg-1.3.3.tar.gz
  wget http://downloads.xiph.org/releases/vorbis/libvorbis-1.3.4.tar.gz
  wget http://www.nasm.us/pub/nasm/releasebuilds/2.13.01/nasm-2.13.01.tar.xz # xz
  wget https://github.com/webmproject/libvpx/archive/v1.7.0.tar.gz
  wget https://download.pytorch.org/whl/cpu/torch-0.4.0-cp36-cp36m-linux_x86_64.whl

  # wget https://archive.mozilla.org/pub/opus/opus-1.3.tar.gz
  git clone git://git.opus-codec.org/opus.git

  # wget https://github.com/yasm/yasm/archive/v1.3.0.tar.gz
  git clone --depth 1 git://github.com/yasm/yasm.git

  # wget https://download.videolan.org/pub/videolan/x264/snapshots/x264-snapshot-20060823-2245.tar.bz2 #bz2
  git clone --depth 1 git://git.videolan.org/x264

  # wget https://github.com/FFmpeg/FFmpeg/archive/n3.3.9.tar.gz
  git clone --depth 1 git://source.ffmpeg.org/ffmpeg

  # wget https://github.com/mstorsjo/fdk-aac/archive/v2.0.0.tar.gz
  git clone --depth 1 git://git.code.sf.net/p/opencore-amr/fdk-aac

popd
