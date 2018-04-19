class Api::DecksController < ApplicationController
  before_action :set_deck, only: [:show, :update, :destroy]

  def index
    render json: Deck.all
  end

  def show
    render json: @deck
  end

  def create
    deck = Deck.new(deck_params)

    if deck.save 
      render json: deck
    else
      render json: deck.errors, status: 422
    end
  end

  def update
    if @deck.update(deck_params)
      render json: @deck
    else
      render json: @deck.errors, status: 422
    end
  end

  def destroy
    @deck.destroy
  end

  private
    def set_deck
      @deck = Deck.find(params[:id])
    end

    def deck_params
      params.require(:deck).permit(:name, :decklist)
    end
end
