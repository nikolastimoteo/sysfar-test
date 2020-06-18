<?php

namespace App\Http\Requests\API\v1;

use Illuminate\Foundation\Http\FormRequest;

class CreateClientFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'       => 'required|string|min:3',
            'email'      => 'required|email|unique:clients',
            'birth_date' => 'sometimes|nullable|date_format:"d/m/Y"',
            'phone'      => 'sometimes|nullable|regex:/\+\d{2}\s\(\d{2}\)\s\d{4,5}\-\d{4}/',
        ];
    }

    /**
     * Get the messages to apply to the validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'required'    => 'Campo obrigatório.',
            'email'       => 'E-mail inválido.',
            'unique'      => 'E-mail já cadastrado.',
            'min'         => 'Mínimo :min caracteres.',
            'date_format' => 'Data em formato inválido. Formato aceito: dd/mm/aaaa',
            'regex'       => 'Número em formato inválido. Formatos aceitos: +99 (99) 99999-9999 ou +99 (99) 9999-9999',
        ];
    }
}
