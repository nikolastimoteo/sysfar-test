<?php

namespace App\Http\Requests\API\v1;

use Illuminate\Foundation\Http\FormRequest;

class EditClientFormRequest extends FormRequest
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
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'birth_date' => str_replace('/', '-', $this->birth_date),
        ]);
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
            'email'      => 'required|email|unique:clients,email,'.$this->route('client'),
            'birth_date' => 'sometimes|nullable|date_format:"d-m-Y"|before:tomorrow',
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
            'date_format' => 'Data inválida. Formato aceito: dd/mm/aaaa',
            'regex'       => 'Telefone inválido. Formatos aceitos: +99 (99) 99999-9999 ou +99 (99) 9999-9999',
            'before'      => 'Data de nascimento inválida.'
        ];
    }
}
