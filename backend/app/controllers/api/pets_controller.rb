class Api::PetsController < ApplicationController
    def index
      pets = Pet.all
      render :json => pets, :include=> [:address, :user, :description]
    end
end

