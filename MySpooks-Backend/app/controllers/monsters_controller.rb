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
    deleted_monster = Monster.find(params[:id])
    deleted_monster.monster_fears.each do |fear|
      fear.destroy
    end
    render json: Monster.find(params[:id]).destroy
  end

  def create_entire_monster
    # pull monster params
    new_name = params[:name]
    new_img_url = params[:img_url]
    # pull spook params
    spook_id = Spook.find_or_create_by(name: params[:spook]).id
    # pull monster_fear params
    monster_fear_id = Spook.find(params[:fear]).id
    rand_fear_id = Spook.all.sample.id
    fear_array = [monster_fear_id, rand_fear_id]

    # byebug
    new_monst = Monster.create(name: new_name, img_url: new_img_url, spook_id: spook_id)

    monster_id = new_monst.id
    mf1 = MonsterFear.create(monster_id: monster_id, spook_id: monster_fear_id)
    mf2 = MonsterFear.create(monster_id: monster_id, spook_id: rand_fear_id)
    # debugger

    render json: new_monst
  end

  private

  def monster_params
    params.require(:monster).permit(:name, :img_url, :spook_id)
  end

  def spook_params
    params.require(:spook).permit(:name)
  end

end
