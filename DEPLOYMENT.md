# Deployment Guide

This guide explains how to deploy the QR Generator app to your VPS using GitHub Actions.

## Prerequisites

1. A VPS with SSH access
2. Nginx installed on your VPS
3. Domain `qr.helgadigitals.com` pointing to your VPS IP

## Setup Instructions

### 1. VPS Setup

SSH into your VPS and run:

```bash
# Create the deployment directory
sudo mkdir -p /var/www/qr

# Set proper ownership (replace 'your-username' with your SSH user)
sudo chown -R www-data:www-data /var/www/qr
sudo chmod -R 755 /var/www/qr

# Allow your user to write to the directory
sudo usermod -a -G www-data your-username
```

### 2. Nginx Configuration

Copy the nginx configuration to your VPS:

```bash
sudo cp nginx.conf /etc/nginx/sites-available/qr.helgadigitals.com
sudo ln -s /etc/nginx/sites-available/qr.helgadigitals.com /etc/nginx/sites-enabled/
```

Test and reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 3. GitHub Secrets

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

- `VPS_HOST`: Your VPS IP address or hostname
- `VPS_USERNAME`: SSH username (e.g., `root` or `ubuntu`)
- `VPS_SSH_KEY`: Your private SSH key (the entire content of `~/.ssh/id_rsa`)
- `VPS_PORT`: SSH port (default is `22`)

#### Generating SSH Key (if needed)

On your local machine:

```bash
# Generate a new SSH key pair
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions

# Copy the public key to your VPS
ssh-copy-id -i ~/.ssh/github_actions.pub your-username@your-vps-ip

# Display the private key (copy this to GitHub secrets)
cat ~/.ssh/github_actions
```

### 4. Test SSH Connection

Verify SSH access works:

```bash
ssh -i ~/.ssh/github_actions your-username@your-vps-ip
```

### 5. Deploy

The workflow will automatically deploy when you push to the `main` branch. You can also trigger it manually from the GitHub Actions tab.

## SSL Setup (Optional but Recommended)

Set up free SSL certificate with Let's Encrypt:

```bash
# Install certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d qr.helgadigitals.com

# Enable automatic renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

After SSL is set up, uncomment the SSL server block in `nginx.conf` and update your nginx configuration:

```bash
sudo cp nginx.conf /etc/nginx/sites-available/qr.helgadigitals.com
sudo nginx -t
sudo systemctl reload nginx
```

## Troubleshooting

### Permission Issues

If deployment fails due to permissions:

```bash
# On VPS
sudo chown -R www-data:www-data /var/www/qr
sudo chmod -R 755 /var/www/qr

# Add your SSH user to www-data group
sudo usermod -a -G www-data your-username
```

### Nginx Issues

Check nginx logs:

```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### GitHub Actions Failing

1. Check that all secrets are set correctly in GitHub
2. Verify SSH key has proper permissions on VPS
3. Ensure the deployment directory exists and is writable
4. Check GitHub Actions logs for specific error messages

## Manual Deployment

If you need to deploy manually:

```bash
# Build locally
pnpm install
pnpm build

# Deploy to VPS
scp -r dist/* your-username@your-vps-ip:/var/www/qr/

# Set permissions
ssh your-username@your-vps-ip "sudo chown -R www-data:www-data /var/www/qr && sudo chmod -R 755 /var/www/qr && sudo systemctl reload nginx"
```

## Monitoring

Monitor your deployment:

```bash
# Check nginx status
sudo systemctl status nginx

# View recent deployments in GitHub Actions
# Go to: https://github.com/lemasani/qr-generator/actions
```
