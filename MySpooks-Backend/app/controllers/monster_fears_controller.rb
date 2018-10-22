class MonsterFearsController < ApplicationController

  def index
  render json: MonsterFear.all
  end


  def create
    render json: MonsterFear.create(monster_fear_params)
  end

  def show
    render json: MonsterFear.find(params[:id])
  end

  private

  def monster_fear_params
    params.require(:monster_fear).permit(:monster_id, :spook_id)
  end

end
