module Api
  module V1
    class UsersController < ApplicationController
      skip_before_filter :verify_authenticity_token
      before_action :set_user, only: [:show, :edit, :update, :destroy]

      # GET /users
      # GET /users.json
      def index
        @users = User.all
        render json: @users
      end

      # GET /users/1
      # GET /users/1.json
      def show
        render json: @user
      end

      # GET /users/new
      # def new
      #   @user = User.new
      # end

      # GET /users/1/edit
      # def edit
      # end

      # POST /users
      # POST /users.json
      def create
        @user = User.new(user_params)

        if @user.save
          render json: @user
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /users/1
      # PATCH/PUT /users/1.json
      def update
        if @user.update(user_params)
          render json: @user, status: :ok
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      # DELETE /users/1
      # DELETE /users/1.json
      def destroy
        @user.destroy
        respond_to do |format|
        #   format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
          format.json { head :no_content }
        end
      end

      # GET /users/1/skills
      def skills
        @user = User.find(params[:user_id])
        @skills = @user.skills
        render json: @skills
      end

      # POST /users/1/skills/new
      def add_skill
        @user = User.find(params[:user_id])
        @skill = @user.skills.find_or_create_by(skill_params)

        if @skill.save
          render json: @skill, status: :created
        else
          render json: @skill.errors, status: :unprocessable_entity
        end
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_user
          @user = User.find(params[:id])
        end

        # Never trust parameters from the scary internet, only allow the white list through.
        def user_params
          params.require(:user).permit(:name, :password, {:skill_ids => []})
        end

        def skill_params
          params.require(:skill).permit(:name)
        end
    end
  end
end
