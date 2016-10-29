#!/usr/bin/env PYTHONIOENCODING="utf-8" python
import tflearn
import pyaudio
import speech_data as data

# Simple speaker recognition demo, with 99% accuracy in under a minute ( on digits sample )

# | Adam | epoch: 030 | loss: 0.05330 - acc: 0.9966 -- iter: 0000/1000
# 'predicted speaker for 9_Vicki_260 : result = ', 'Vicki'

speakers = data.get_speakers()
number_classes=len(speakers)
print("speakers",speakers)

WORD_WAVs="spoken_words"
batch=data.wave_batch_generator(batch_size=1000,source=WORD_WAVs,target=data.Target.speaker)
X,Y=next(batch)


# Classification
tflearn.init_graph(num_cores=8, gpu_memory_fraction=0.5)

net = tflearn.input_data(shape=[None, 8192]) #Two wave chunks
net = tflearn.fully_connected(net, 64)
net = tflearn.dropout(net, 0.5)
net = tflearn.fully_connected(net, number_classes, activation='softmax')
net = tflearn.regression(net, optimizer='adam', loss='categorical_crossentropy')

model = tflearn.DNN(net)
model.fit(X, Y, n_epoch=100, show_metric=True, snapshot_step=100)

# demo_file = "8_Vicki_260.wav"
demo_file = "8_Bruce_260.wav"
demo=data.load_wav_file(data.path + demo_file)
result=model.predict([demo])
result=data.one_hot_to_item(result,speakers)
print("predicted speaker for %s : result = %s "%(demo_file,result))
