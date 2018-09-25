---
layout: post
mathjax: true
title:  "Clustering electricity usage profiles with K-means"
date:   2018-09-20
categories: data
description: How to group similar patterns of energy consumption 
tags: [time-series, clustering, k-means]
---


![](https://cdn-images-1.medium.com/max/1600/1*D5xK-SkyBZdV8g35CLF4FQ.jpeg)

Machine Learning has a wide range of [applications](https://www.digitalistmag.com/digital-economy/2018/05/17/10-ways-utility-companies-can-use-artificial-intelligence-machine-learning-06167501) for the energy sector. A very exciting one is extracting insights into electricity consumption behavior. The way in which an individual or family uses energy across the day is also known as “energy fingerprint”.

In this article, we will go through how to find patterns in the daily load profiles of a single household with the K-means clustering algorithm.

The dataset contains 2075259 measurements gathered between December 2006 and November 2010 (47 months). You can find it [here](https://archive.ics.uci.edu/ml/datasets/individual+household+electric+power+consumption).

### First, let’s get the data ready
{% gist 360f3a9ddc6f15aea672511398fdcf48 %}

![](https://cdn-images-1.medium.com/max/1600/1*9kwcwQtMTgdnxG1uKCY2NA.png)

The plot above shows all the daily-load profiles of 1456 days plotted together. We can see two clear patterns of consumption behavior by looking at the darker regions (where more curves are concentrated).

### Clustering with K-means

K-means is an [unsupervised machine learning](https://en.wikipedia.org/wiki/Unsupervised_learning) algorithm in which the number of clusters has to be defined a priori. This leaves the question of how many clusters to pick.

A common method to address this is to use the [silhouette value](https://en.wikipedia.org/wiki/Silhouette_%28clustering%29). It is a measure of how similar a point is to its own cluster compared to other clusters. It ranges from -1 to 1, where a high value indicates that a point has a good match with the cluster it belongs.

We take the average of the silhouette across all load-profiles in order to have a global view of how the algorithm is performing.

I experiment with a range of cluster numbers (from 2 to 30). It is important to scale each period within the same range so that the magnitude of the energy load does not interfere in the selection of the cluster.

{% gist b595b0dec83448a4b6b90a209efac503 %}

![](https://cdn-images-1.medium.com/max/1600/1*9QNrTFc93ZXAHdcH2bX8MA.png)

The maximum average silhouette occurs when there are only 2 clusters, but to better illustrate this example, I choose 3\. Let’s see how they look:

{% gist add68418f80a06b2cb36277ef742041e %}

![](https://cdn-images-1.medium.com/max/2000/1*0Uq0I9w_XU-m6vaK0T5hUg.png)

As we can see, K-means found three unique groups of load-profiles.

The green cluster contains loads that maintain a steady use of energy throughout the afternoon. Maybe these are days where the occupants stayed at home, like weekends and special dates.

The blue cluster has a high peak in the morning, a decline in usage during the afternoon and high again at night. This pattern seems to fit business days when occupants leave for work and/or school.

Finally, the red cluster shows days when consumption is low throughout the whole day. Maybe a case of holidays when only a few appliances are left on?

### Validating results with t-SNE

One way we can validate the results of the clustering algorithm is to use a form of [dimensionality reduction](https://en.wikipedia.org/wiki/Dimensionality_reduction) and plot the points in a 2D plane. Then, we can color them according to the cluster they belong.

A popular algorithm for this purpose is called [t-SNE](https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding). The inner workings of the algorithm are beyond the scope of this article, but a very good explanation can be found [here](https://distill.pub/2016/misread-tsne/).

The thing to keep in mind is that t-SNE doesn’t know anything about the clusters found by K-means.
{% gist d56a471db98451851a0a380e0e81c543 %}

![](https://cdn-images-1.medium.com/max/1600/1*_EblW6FHUVxX4gD690twug.png)

In the above plot, each point represents a daily load-profile. They were reduced from 24 to 2 dimensions. Theoretically, the distance between points in the higher dimensional space was preserved, so points that are close together refer to similar load-profiles. The fact that most blue, red and green points are close together is an indication that the clustering worked well.

### Conclusion and further work

This article presented a way to find clusters of electricity usage with the K-means algorithm. We used the silhouette score to find the optimal number of clusters and t-SNE to validate the results.

As for next steps, we could try different clustering algorithms. [Scikit-learn](http://scikit-learn.org/stable/modules/clustering.html) has a bunch of them to explore. Some don’t require the choice of the number of clusters to be made a priori.

Another interesting application would be to extend this model to different households and find clusters of similar energy consumption behavior across families.

I hope you enjoyed it! If you have any comments and/or suggestions feel free to contact me.
