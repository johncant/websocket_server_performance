# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.
PumaApp::Application.config.secret_key_base = '40cfacba421502e2ec3e315dbdfb0ea5e822d55271a209c07e48683f385ffde0dca63d46b19cf912ac56ef8ae2150d4f1b3129eaa6154c0a607b667ed504bee3'
