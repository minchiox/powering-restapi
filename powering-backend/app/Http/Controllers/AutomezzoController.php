<?php

namespace App\Http\Controllers;

use App\Models\Automezzo;
use Illuminate\Http\Request;

class AutomezzoController extends Controller
{
    public function index()
    {
        $automezzi = Automezzo::all();
        return response()->json($automezzi);
    }

    public function show($id)
    {
        $automezzo = Automezzo::findOrFail($id);
        return response()->json($automezzo);
    }

    public function store(Request $request)
    {
        $automezzo = Automezzo::create($request->all());
        return response()->json($automezzo, 201);
    }

    public function destroy($id)
    {
        $automezzo = Automezzo::findOrFail($id);
        $automezzo->delete();
        return response()->json(null, 204);
    }
}
