class Api::QueryController < ApplicationController
  include HTTParty

  def query
    response = HTTParty.get('https://api.hearthstonejson.com/v1/23966/enUS/cards.collectible.json')
    render json: response.to_s
  end
end
