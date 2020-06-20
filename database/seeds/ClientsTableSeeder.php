<?php

use Illuminate\Database\Seeder;
use App\Client;

class ClientsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Client::create([
            'name'       => 'Antônio',
            'email'      => 'antonio@me.com',
            'birth_date' => '2001-07-18',
            'phone'      => '+55 (18) 5555-5555'
        ]);
        Client::create([
            'name'        => 'Ricardo',
            'email'       => 'ricardo@me.com',
            'birth_date'  => '2000-04-15',
            'phone'       => '+55 (18) 66666-6666'
        ]);
        Client::create([
            'name'       => 'Maria',
            'email'      => 'maria@me.com',
            'birth_date' => '1986-01-23',
            'phone'      => '+55 (18) 1111-1111'
        ]);
        Client::create([
            'name'       => 'Roberto',
            'email'      => 'roberto@me.com',
            'birth_date' => '1990-09-04'
        ]);
        Client::create([
            'name'       => 'Algusto',
            'email'      => 'algusto@me.com',
            'birth_date' => '1993-04-04'
        ]);
        Client::create([
            'name'       => 'José',
            'email'      => 'jose@me.com',
            'birth_date' => '1995-07-04'
        ]);
        Client::create([
            'name'     => 'João',
            'email'    => 'joao@me.com',
            'phone'    => '+55 (18) 7777-7777'
        ]);
        Client::create([
            'name'     => 'Vitor',
            'email'    => 'vitor@me.com',
            'phone'    => '+55 (18) 9999-9999'
        ]);
        Client::create([
            'name'     => 'Hugo',
            'email'    => 'hugo@me.com',
            'phone'    => '+55 (18) 33333-3333'
        ]);
        Client::create([
            'name'     => 'Marcela',
            'email'    => 'marcela@me.com'
        ]);
        Client::create([
            'name'     => 'Manuela',
            'email'    => 'manuela@me.com'
        ]);
        Client::create([
            'name'     => 'Maurício',
            'email'    => 'mauricio@me.com'
        ]);
        Client::create([
            'name'     => 'Pedro',
            'email'    => 'pedro@me.com'
        ]);
        Client::create([
            'name'     => 'Guilherme',
            'email'    => 'guilherme@me.com'
        ]);
    }
}
