# https://about.gitlab.com/install/#centos-7

### Install and configure the necessary dependencies

# On CentOS 7 (and RedHat/Oracle/Scientific Linux 7), the commands below will also open HTTP
# and SSH access in the system firewall
sudo yum install -y curl policycoreutils-python openssh-server
sudo systemctl enable sshd
sudo systemctl start sshd
sudo firewall-cmd --permanent --add-service=http
sudo systemctl reload firewalld

### Next, install Postfix to send notification emails.

# If you want to use another solution to send emails please skip this step and configure an external
# SMTP server after GitLab has been installed.

sudo yum install -y postfix
sudo systemctl enable postfix
sudo systemctl start postfix

# During Postfix installation a configuration screen may appear.
# Select 'Internet Site' and press enter. Use your server's external DNS for 'mail name' and press enter.
# If additional screens appear, continue to press enter to accept the defaults.

### Add the GitLab package repository and install the package

# Add the GitLab package repository.

curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.rpm.sh | sudo bash


sudo EXTERNAL_URL="https://registry.anymetrica.com" yum install -y gitlab-ee

### Browse to the hostname and login

# On your first visit, you'll be redirected to a password reset screen.
# Provide the password for the initial administrator account and you will be redirected back to the login screen.
# Use the default account's username root to login.

# See our documentation for detailed instructions on installing and configuration.

### Set up your communication preferences

# Visit our email subscription preference center to let us know when to communicate with you.
# We have an explicit email opt-in policy so you have complete control over what and how often we send you emails.

# Twice a month, we send out the GitLab news you need to know, including new features, integrations, docs,
# and behind the scenes stories from our dev teams. For critical security updates related to bugs and system
# performance, sign up for our dedicated security newsletter.
