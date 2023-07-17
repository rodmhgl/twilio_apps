variable "public_ssh_key" {
  type        = string
  description = "The string value of the public SSH key to be used for the DigitalOcean droplet."
}

variable "do_token" {
  type        = string
  description = "The DigitalOcean API token."
  sensitive   = true
}