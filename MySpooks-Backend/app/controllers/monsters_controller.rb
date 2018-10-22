class MonstersController < ApplicationController

  def index
    render json: Monster.all
  end

  def show
    render json: Monster.find(params[:id])
  end

  def create
    render json: Monster.create(monster_params)
  end

  def update
    Monster.find(params[:id]).update(monster_params)
    render json: Monster.find(params[:id])
  end

  def destroy
    render json: Monster.find(params[:id]).destroy
  end

  private

  def monster_params
    params.require(:monster).permit(:name, :img_url, :spook_id)
  end



end
