locals {
  dns_zone_name     = "awkwardweirdterribleandbad.com"
  dns_a_record_name = "twilio"
  droplet_size      = "s-1vcpu-512mb-10gb" # size, image, and region slugs - https://slugs.do-api.dev/
  droplet_image     = "nodejs-20-04"
  droplet_region    = "sfo3"
}

resource "digitalocean_ssh_key" "this" {
  name       = "digitalocean_key"
  public_key = var.public_ssh_key
}

resource "digitalocean_droplet" "twilio_apps" {
  name   = "twilio-drops"
  size   = local.droplet_size
  region = local.droplet_region
  image  = local.droplet_image
  ssh_keys = [
    digitalocean_ssh_key.this.id
  ]
}

resource "digitalocean_reserved_ip" "this" {
  droplet_id = digitalocean_droplet.twilio_apps.id
  region     = digitalocean_droplet.twilio_apps.region
}

data "azurerm_dns_zone" "this" {
  name = local.dns_zone_name
}

resource "azurerm_dns_a_record" "twilio" {
  name                = local.dns_a_record_name
  ttl                 = 60
  records             = [digitalocean_reserved_ip.this.ip_address]
  resource_group_name = data.azurerm_dns_zone.this.resource_group_name
  zone_name           = data.azurerm_dns_zone.this.name
}

output "dns_record" {
  value = "${azurerm_dns_a_record.twilio.fqdn} ${digitalocean_reserved_ip.this.ip_address}"
}