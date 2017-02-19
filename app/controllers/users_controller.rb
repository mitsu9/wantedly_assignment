class UsersController < ApplicationController
  before_action :set_user, only: [:show]

  def index
    @users = User.all
  end

  def show
  end

  def login
    @user = User.find_by(user_params)

    if @user
      log_in @user
      head :ok
    else
      flash[:error]  = 'Failed login'
      head :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:name, :password, {:skill_ids => []})
    end
end
