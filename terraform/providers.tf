terraform {
  required_version = ">=1.5.0"

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.28.1"
    }
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.63.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "tfstate"
    storage_account_name = "tfstate6982"
    container_name       = "tfstate"
    key                  = "prod/twilio_do.tfstate"
    use_oidc             = true
    use_azuread_auth     = true
  }

}

provider "azurerm" {
  use_oidc = true
  features {}
}

provider "digitalocean" {
  token = var.do_token
}