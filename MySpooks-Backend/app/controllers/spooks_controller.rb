class SpooksController < ApplicationController
  def index
    render json: Spook.all
  end

  def show
    render json: Spook.find(params[:id])
  end

  def create
      render json: Spook.create(spook_params)
  end

  private
  def spook_params
    params.require(:spook).permit(:name)
  end

  
end
