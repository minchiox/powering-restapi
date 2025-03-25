<?php

namespace App\Http\Controllers;

use App\Models\Filiale;
use Illuminate\Http\Request;

class FilialeController extends Controller
{
    public function index()
    {
        $filiali = Filiale::all();
        return response()->json($filiali);
    }

    public function show($id)
    {
        $filiale = Filiale::findOrFail($id);
        return response()->json($filiale);
    }

    public function store(Request $request)
    {
        $filiale = Filiale::create($request->all());
        return response()->json($filiale, 201);
    }

    public function destroy($id)
    {
        $filiale = Filiale::findOrFail($id);
        $filiale->delete();
        return response()->json(null, 204);
    }
}
