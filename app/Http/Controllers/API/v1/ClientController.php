<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\API\v1\CreateClientFormRequest;
use App\Http\Requests\API\v1\EditClientFormRequest;
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
        $clients = Client::orderBy('name', 'ASC')->paginate(10);

        return response()->json([
            'paginated_clients' => $clients
        ], 200);
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
            'birth_date' => $request->birth_date ? date('Y-m-d', strtotime($request->birth_date)) : null,
            'phone'      => $request->phone ? $request->phone : null
        ]);

        return response()->json([
            'message' => 'Cliente cadastrado.',
            'client'  => new ClientResource($client)
        ], 201);
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
     * @author Níkolas Timóteo <nikolastps@hotmail.com>
     * @param  \Illuminate\Http\EditClientFormRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(EditClientFormRequest $request, $id)
    {
        $client = Client::find($id);

        if ($client) {
            $client->update([
                'name'       => $request->name,
                'email'      => $request->email,
                'birth_date' => $request->birth_date ? date('Y-m-d', strtotime($request->birth_date)) : null,
                'phone'      => $request->phone ? $request->phone : null
            ]);
    
            return response()->json([
                'message' => 'Cliente alterado.',
                'client'  => new ClientResource($client)
            ], 200);
        }

        return response()->json([
            'message' => 'Cliente não encontrado.'
        ], 404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @author Níkolas Timóteo <nikolastps@hotmail.com>
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $client = Client::find($id);

        if ($client) {
            $client->delete();

            return response()->json([
                'message' => 'Cliente excluído.'
            ], 200);
        }

        return response()->json([
            'message' => 'Cliente não encontrado.'
        ], 404);
    }

    /**
     * Searches for a client that matches the query.
     * 
     * @author Níkolas Timóteo <nikolastps@hotmail.com>
     * @param string $query
     * @param int $page
     * @return \Illuminate\Http\Response
     */
    public function search()
    {
        if($search = request()->get('query')) {
            $clients = Client::where(function($query) use ($search) {
                $query->where('name', 'LIKE', '%'.$search.'%')
                ->orWhere('birth_date', date('Y-m-d', strtotime(str_replace('/', '-', $search))));
            })->orderBy('name', 'ASC')->paginate(10);
        } else {
            $clients = Client::paginate(10);
        }
        
        return response()->json([
            'paginated_clients' => $clients
        ], 200);
    }
}
