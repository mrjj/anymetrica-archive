mkdir -p ./build
cd ./build

rm -rf ./speech2vec
git clone https://github.com/iammrhelo/speech2vec.git

rm -rf ./wav2letter
git clone https://github.com/facebookresearch/wav2letter.git

rm -rf ./wav2letter-docker
git clone https://github.com/grahamimac/wav2letter-docker.git
