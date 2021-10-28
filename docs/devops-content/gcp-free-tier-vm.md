# Host A Web Server On GCP's Free Tier

<em>Disclaimer: There may be some real costs incurred by your GCP resources based on usage.  Due to the changing nature of technology, GCP's Free Tier may have changed since the time this blog post was written.  See [GCP's Free Tier Guide](https://cloud.google.com/free/) for the latest information regarding GCP's Free Tier</em>

Have you ever had an idea for an app or website that would make your life easier - but you need a web server to host it?  Have you ever wanted to get involved with cloud computing, but don't quite know where to start?

In this post, I will outline the instructions for how to use Google Cloud Project (GCP)'s Free Tier offerings to create your first cloud web server resource!

Before we jump into it, let's review a few things:

 * A **Web Server** is a computer that can be used to provide backend functionality for full-stack applications.  Web servers often store data, files, and code that can be used by other devices to support applications and web sites.

 * **Cloud Computing** is a way of using computer resources over a network where remote data storage and processing services are hosted by someone else on the internet.  Popular cloud computing providers include GCP, Microsoft Azure, and Amazon Web Services.  Cloud resources are valuable because they allow for dynamic allocation of resources based on need.  These cloud resources could be running in data centers across the world, meaning you could create a cloud resource in Oregon while at your desk in Alabama!

So by setting up a web server in the cloud, you are establishing a computing resource where you can run code to support any web or mobile app idea you have!  You don't have to worry as much about buying the physical server equipment, plugging it in, and other things that come along with setting up a physical machine.

## Free Tier? What's that?

Most major cloud providers offer a "free" tier.  The free tiers allow you to use a set type of hardware in pre-determined regions for a specific amount of usage at no cost.  If you ever create a resource that is outside of the free tier or if you exceed the free tier usage limits, you may incur cost to your account.  It can be intimidating to try to stay within the limits of the free tiers so you don't have to pay any money, but I will try to share with you the way I have set up my cloud resources to stay within the free tier limits.

Some cloud providers offer free or discounted pricing for the first few months of your cloud membership.  But for our tutorial, we will take advantage of GCP's always free tier, which doesn't expire (though it is subject to change).

## Why Google Cloud Project and not another cloud provider?

There are many horror stories of people setting up cloud resources, forgetting about them, and receiving a surprise bill that is hundreds or many thousands of dollars.  It's important to set up billing alerts and cloud resource dashboards so this doesn't happen to you.  If you're unfamiliar with using these cloud user interfaces though, it can be unclear if you have set things up correctly and that can be scary.

In my opinion, GCP offers the most intuitive web User Interface (UI) and mobile application for new users.  GCP's free tier is also the easiest to understand based on their [pricing guides](https://cloud.google.com/free/).  This means GCP offers the most transparent billing/usage experience out of the major cloud providers.  Although AWS and Azure can be configured to have the same billing alerts and usage dashboards, GCP's UI is the most beginner-friendly and gives me the most confidence.

GCP also offers \$300 in free cloud credits to new customers.  This means you can follow my guide and even if you make a mistake, you still have a \$300 buffer before you incur any real cost.

## Walkthrough

Enough talk, let's get to it.  Follow the steps below to set up your web server in GCP:

1. Create a GCP account
2. Access the GCP console
3. 