<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Client extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'email'       => $this->email,
            'birth_date'  => $this->birth_date,
            'phone'       => $this->phone,
            'created_at'  => $this->created_at,
            'updated_at'  => $this->updated_at
        ];
    }
}
