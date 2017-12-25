---
layout: post
mathjax: true
title:  "How prepare the input of Recurrent Models in Keras"
date:   2017-12-19 
description: How Keras expects your input to be
categories: data
tags: [LSTM,GRU,RNN,time-series,Keras]
---
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript" ></script>



While browsing through stackoverflow I discovered that people have a hard time understanding how to shape the inputs to a sequence model in Keras. By sequence models I mean, RNNs, GRUs and LSTMs. 

I had a hard time understanding it too. I think that there could be some examples on the Keras website 

Basically, what a sequence model in Keras expects is a 3 dimensional numpy array with shape (samples, features, sequence length). Keras documentation calls them (batch_size, timesteps, input_dim), but I find it a bit confusing. But four our purposes they mean the same thing.


<img src="/assets/images/tensor.png" width="400">


Suppose you have data of Macbook Pro daily sales for 1000 different Apple Stores for the period of one year (364 days). You want to train a model so that you can predict how many Macbooks Pros will a store sell in a day. 

<img src="/assets/images/macbook-timeseries.png" width="580">

Let's say we use separate the first 200 days for training and we want to predict the number of sales for any store for the next day, in the case the 201th day. 

The shape of our array will be (1000,200,1). We have 1000 time-series (samples), the length of our sequences is 200 and we have only 1 feature. Our feature in this case is the time-series own past-values. This is has our input tensor will look like:

<img src="/assets/images/tensor_slice.png" width="200">

Now let's put this guy into our Keras model:

{% highlight python %}
from keras.models import Sequential
from keras.layers import LSTM,Dense

# X is our tensor

my_lstm = Sequential()
my_lstm.add(LSTM(32,input_shape(32,12,),return_sequences=False))
my_lstm.add(Dense(1))

{% endhighlight %}


What if we want to add another feature to help us predict the next day sale? Suppose, for the sake of argument, that we believe temperature might affect peoples decision to buy Macbooks. 





