class Api::PetsController < ApplicationController
    def index
      pets = Pet.all
      render :json => pets, :include=> [:address, :user, :description]
    end

    def create
      puts params
      rubyDate = Time.at(params['pet']['date_lost'] / 1000)
      @address = Address.create!(
        street_number: params['address']['street_number'],
        street_name: params['address']['street_name'],
        apartment: params['address']['apartment'],
        city: params['address']['city'],
        province: params['address']['province'],
        postal_code: params['address']['postal_code'],
      )
      @description = Description.create!(
        breed: params['description']['breed'],
        colour: params['description']['colour'],
        sex: params['description']['sex]'],
        additional: params['description']['additional'],
      )
      @pet = Pet.create!(
        name: params['pet']['name'],
        species: params['pet']['species'],
        status: params['pet']['status'],
        date_lost: rubyDate,
        picture: params['pet']['picture'],
        picture_merged: params['pet']['picture_merged'],
        latitude: params['pet']['latitude'],
        longitude: params['pet']['longitude'],
        address_id: @address.id,
        description_id: @description.id,
        user_id: params['pet']['user_id'],
      )

      if @pet.save
        render :json => @pet, :include=> [:address, :user, :description]
      else
        render :new
      end

    end

end

