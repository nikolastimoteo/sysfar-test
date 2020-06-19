<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\API\v1\CreateClientFormRequest;
use App\Http\Resources\Client as ClientResource;
use App\Client;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @author Níkolas Timóteo <nikolastps@hotmail.com>
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $clients = Client::orderBy('name', 'ASC')->paginate(20);

        return response()->json([
            'paginated_clients' => $clients
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @author Níkolas Timóteo <nikolastps@hotmail.com>
     * @param  \Illuminate\Http\CreateClientFormRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateClientFormRequest $request)
    {
        $client = Client::create([
            'name'       => $request->name,
            'email'      => $request->email,
            'birth_date' => date('Y-m-d', strtotime($request->birth_date)),
            'phone'      => $request->phone
        ]);

        return response()->json([
            'message' => 'Cliente cadastrado.',
            'client'  => new ClientResource($client)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @author Níkolas Timóteo <nikolastps@hotmail.com>
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $client = Client::find($id);

        if ($client) {
            return response()->json([
                'client' => new ClientResource($client)
            ], 200);
        }

        return response()->json([
            'message' => 'Cliente não encontrado.'
        ], 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
