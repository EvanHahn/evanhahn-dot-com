**What the heck is Vagrant?**

*This assumes you know what these things are: CPUs, RAM, hard drives, operating systems, and SSH. No need to be an expert; just know what they are, kinda! You should also know how to use the command line, but once again, no expertise is required.*

In short, [Vagrant](https://www.vagrantup.com/) is a tool that makes it easy to spin up virtual machines for programming purposes. If the previous sentence made complete sense to you, feel free to stop reading. If the previous sentence made no sense to you—what's a "virtual machine" and what does it mean to spin one up—read on, friend.

A side note: this guide is meant to give you a conceptual understanding and show the basics of Vagrant. I'll be glossing over some details, so please send me any pedantic comments and I'll correct things.

The real world
==============

Imagine you've got a laptop. It's physical. It's real. You can touch it. You can hold it in your little paws.

This real-life laptop has a processor and RAM and a hard disk and maybe a CD drive. These things are real. You can touch them. You can rip them out of the computer and hold them with your little paws.

This computer is running an operating system (OS), like Windows or macOS or Linux.

You're tap-tap-typing on the keyboard, using this OS. All the while, the processor and RAM and hard disk are shuffling electrons around, doing the OS's bidding. You might double-click a photo on your hard disk, and the OS will command the hard disk to spin around and put the photo into RAM; the CPU will process the data in the RAM and show the photo to you.

In one way or another, this is how pretty much all laptops work. The operating system—usually Windows, macOS, or Linux—runs on the machine, commanding the computer's physical components.

You admire this achievement. This electrical concoction has changed the course of human civilization, causing buildings to rise and empires to fall, lovers to meet and art to be created. Who could ever want more than the modern computer?

Squinting, you ask yourself: "What if we could put a computer...*inside another computer*??" A question that seems silly at first, but emerges as brilliant after even harder squinting.

Enter the virtual machine
=========================

This computer-in-a-computer is what people refer to as a **virtual machine**. This is a computer, just like your laptop—it's got a processor and RAM and a hard disk and it runs an operating system. But it's not physical. You can't reach out and clutch one of these in your paws. It lives inside of your computer. A computer *inside another computer*; a virtual machine.

When I first heard of this, I stammered. "How...how the heck??"

When your operating system is running on your real laptop, it might want to access a photo from the hard disk and pull it into RAM and process it with the CPU. Effectively, it's talking directly to the hardware, commanding electrons to do its bidding. (There are some steps I'm leaving out for sake of explanation; let's assume it's talking directly to the hardware.)

When an operating system is running in a *virtual* machine, it's being lied to. The OS *thinks* it's talking to a real hard disk and real RAM and a real CPU. But the "host" computer is lying. It's giving that operating system a *virtual* hard disk and *virtual* RAM and a *virtual* CPU.

These virtual components communicate with their physical counterparts, but it's not a simple pass-through. For example, you might have an 100-gigabyte hard drive in the physical world, but you might lie to the operating system and only tell it it's got an 8-gigabyte hard drive to work with. This can prevent the virtual machine from going haywire and taking over your entire disk.

There are many other ways that these virtual components "translate" their communications with the physical world. This translation takes time, so virtual machines aren't usually as fast as physical ones.

Why would you need this?
========================

So now we have this potentially-confusing virtualization layer. The next question you might ask: why in the world would you want to do this? Let's go through four scenarios, all of which are examples from my real life:

1. I was running Mac OS X but needed to run some Windows software. I used my physical Mac computer to create a virtual Windows computer. I could boot Windows, log in, and run the program I needed to run, all from the comfort of Mac OS X.

   Here's what that looked like:
   
   ![Screenshot of Windows running in OS X](https://s3.amazonaws.com/f.cl.ly/items/1U0n3G1M3z1d2m230x1E/resized.png?v=e474bcb5)
   
   This uses a bit of virtualization software called [VirtualBox](https://www.virtualbox.org/), which describes itself as "a cross-platform virtualization application." It's basically a thing that lets you create and use virtual machines. More on VirtualBox soon!
   
2. Somehow, I always find a way to ruin Ruby every time I install it. I get it installed, I get it running something, and then I somehow break it. I used to do this on my physical machine, and there would come a point where Ruby would just stop working and I had no idea how to recover it.

   Now, whenever I need to use Ruby, I hop into my virtual machine. I do my work, and when I eventually wreck my system, I can just trash the virtual machine and make a new one. You can even (easily!) get virtual machines that have Ruby all set up, so I don't have to do any of the installation myself. Sure, it takes a few minutes to re-initialize the whole virtual machine, but it's a whole lot better than having to buy a new laptop.

   I try to do this for all of my programming, even if it's not Ruby and I know how to fix a broken installation. (Note: I do not do this for all of my programming just like I do not always diet how I should.)
3. Related to the above: if I've completely borked my Ruby installation on my physical laptop (I have), I can hop into a virtual machine where it's all working blissfully.
4. I've been on computers that I can't (or don't *want* to) install things on, usually because I don't have administrator privileges. I can create a virtual machine where I have complete control, and I can do whatever I want while cackling like a villain.

There are other benefits to virtual machines, but those are four things they've helped me with in my career.

Recall the first sentence:

> In short, Vagrant is a tool that makes it easy to spin up virtual machines for programming purposes.

Now we know what virtual machines are. How do we use them, and how do they relate to Vagrant? Unfortunately, we can't talk about Vagrant before we talk a little bit about a tool called VirtualBox.

VirtualBox, a thing for using virtual machines
==============================================

I mentioned [VirtualBox](https://www.virtualbox.org/) earlier. It's one of [many tools](http://alternativeto.net/software/virtualbox/) you can use to create and use virtual machines. I like it because it (1) works pretty well (2) is free. I won't go through detailed instructions here, but basically, you need to *create* the virtual machine and then *use* it.

1. To create the virtual machine, you'll need something that can install an operating system. This is analagous to the CD you'd insert into a physical computer to install the OS, but it's just a file (an ISO file, usually). You tell VirtualBox about this ISO file, and then you tell it some information about the new virtual machine you'll be creating. How much RAM should it have? How big should its hard drive be?
2. Once you've configured it, you're ready to use the machine. You use this just like you'd use a normal machine—you look at the screen, you click around, you type on the keyboard—but it's all happening in a window on your host computer. I think the screenshot above helps to explain what that looks like.

I use VirtualBox a lot at my job. I use a Mac, but we need to test things with Internet Explorer on Windows. I downloaded [official Internet Explorer virtual machines](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) from Microsoft, installed them, and then booted up the virtual machines and tested things in Internet Explorer. My company would need to buy at least one Windows computer for every version of Internet Explorer we wanted to test, and only one person could test at time!

VirtualBox is useful for a lot of things and it's super helpful to me. But now, friend, we segue into what you truly care about: Vagrant.

One of the things that's good about VirtualBox is that it's super powerful and customizable, so you can set up virtual machines to do a wide range of tasks. One of the bad things about VirtualBox is that some stuff is hard to set up, and it's not always great to write code with. You know what solves these problems?

Vagrant, a thing for making virtual machines nice for coding
============================================================

Vagrant's homepage says that it makes it easy to "create and configure lightweight, reproducible, and portable development environments." The words "virtual machine" never appear anywhere on the homepage, but trust me: Vagrant is *all about* virtual machines.

Here's how Vagrant works (once you've [downloaded](https://www.vagrantup.com/downloads.html) and installed it):

1. You create (or grab from someone else) a file called a `Vagrantfile`. This file describes what your new machine should look like. Should it be an Ubuntu machine? What version? How much RAM should it have? Here's a really simple `Vagrantfile` that describes an Ubuntu machine with all the default settings:

        VAGRANTFILE_API_VERSION = '2'
   
        Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
          config.vm.box = 'ubuntu/trusty64'
        end
   
   `ubuntu/trusty64` tells Vagrant that it needs to use a 64-bit version of [the Ubuntu version called "Trusty Tahr"](http://releases.ubuntu.com/trusty/). You can change this to other Ubuntu versions or even other operating systems, but most people seem to stick to the open-source Ubuntu when they use Vagrant.
   
   The `Vagrantfile` is kinda like buying a physical computer. You go to the shop and decide how much RAM to get, what operating system you want, et cetera.
2. You open up your terminal and `cd` into the same directory as the `Vagrantfile`.
3. You run `vagrant up`. This creates the virtual machine. By default, it uses VirtualBox to do this under the hood. It tells VirtualBox all of the things it needs to know to set up this new computer.

   This will take a few minutes and spit out a bunch of output, but when it's done, a virtual machine will be running on your computer! It's invisible because it's running in the background, but it's there. (Vagrant virtual machines can only be accessed from the command line, which we'll do in the next step.)
   
   This is like hitting the power button on a physical laptop and installing the operating system.
4. You can then SSH into this virtual machine with `vagrant ssh`. This is as if you'd SSH'd into a computer across the web, but it's not across the web—it's a fake computer running right in front of you.

   While you're SSH'd in, you can run commands inside of the virtual machine. You can create and delete files, run and install programs, or do whatever you want. Note that any commands you run here are run *inside of the virtual machine*, not your main machine.
5. When you're all done, you should log out of your SSH session. You can do this just like you'd exit a normal SSH session. You can type `exit` in the command line to close your session, or just close the terminal window on your host computer.

   Note that doing this doesn't stop your virtual machine from running. It's still chugging away, doing whatever it does. This would be like walking away from a laptop. That doesn't stop it from running, it's just that you're no longer sitting in front of it.
6. From your host computer, `cd`'d into the same folder as before, you can run `vagrant halt`. This will shut down the virtual machine. All of the files will still be there and you can restart it with `vagrant up` later, but the virtual machine won't be running any more. This would be like turning off a real laptop.
7. When you're completely done with the virtual machine, you can destroy it with `vagrant destroy`. This will clobber all of the files on the virtual machine. It's the virtual equivalent of throwing your laptop in the garbage! Don't do this if you ever want to see the virtual machine again.

Vagrant really only has four main commands:

- `vagrant up` to create/start a new Vagrant virtual machine
- `vagrant ssh` to SSH into an already-started virtual machine
- `vagrant halt` to stop a virtual machine (which can later be restarted)
- `vagrant destroy` to completely obliterate a virtual machine (which can never be restarted)

It's got other commands, but those are the four I use the most. These simple commands, with the help of the `Vagrantfile`, make it pretty easy to spin up virtual machines that you can use for development.

Vagrant has two other features, too: synced folders and quick provisioning.

Vagrant's synced folder
=======================

I like to use [Atom](https://atom.io/) to edit my code. Other people like to use editors like Sublime Text or IDEs. This poses a problem for Vagrant. Vagrant virtual machines can only be accessed from the command line, so how will I use Atom? And what if there are files on my host computer that I want to put into the virtual machine?

Enter Vagrant's *synced folder*.

Let's say your `Vagrantfile` is in a folder on your host computer at the path `~/code/my-project`. Any file that's in this folder (including the `Vagrantfile`) is accessible from inside the virtual machine at the path `/vagrant`. So if you're SSH'd into your virtual machine (using `vagrant ssh`), you can `cd /vagrant` to see all of the files that have been put in that folder. And it's two-way; if you create a file while SSH'd into the virtual machine, it magically appears in `~/code/my-project`.

This means that I can edit code in Atom all I want. I can open Atom on my computer, edit the files in `~/code/my-project`, and then run them from inside the Vagrant virtual machine.

(You can [change the configuration for synced folders](https://www.vagrantup.com/docs/synced-folders/basic_usage.html). You can make change where they are or add new ones if you wish. Personally, I quite like the default and haven't ever changed it.)

Vagrant provisioning
====================

The synced folder is cool, I guess. But [provisioning](https://www.vagrantup.com/docs/provisioning/) is, in my opinion, Vagrant's killer feature.

You know how the `Vagrantfile` lets you configure the operating system? It also lets you install stuff on the operating system. For example, you know how I always screw up my Ruby installation? Instead of having to install everything on a Vagrant virtual machine by myself, I can use one of the [many](https://github.com/search?utf8=✓&q=Vagrant+Ruby&type=Repositories&ref=searchresults) Vagrant + Ruby presets out there.

To use this, I don't write my own `Vagrantfile`. I download one of them from the internet, `cd` inside, and run `vagrant up`. I sit back, watching a new virtual machine appear before my eyes. When it's all done, I can `vagrant ssh` inside and Ruby is set up without me having to do any extra work.

In summary
==========

In short, [Vagrant](https://www.vagrantup.com/) is a tool that makes it easy to spin up virtual machines for programming purposes.
