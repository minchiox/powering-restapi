<?php

namespace App\Http\Controllers;

use App\Models\Filiale;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;

class FilialeController extends Controller
{
    public function index()
    {
        return response()->json(Filiale::all());
    }

    public function show($id)
    {
        try {
            $filiale = Filiale::findOrFail($id);
            return response()->json($filiale);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Filiale non trovata.'], 404);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'nome' => 'required|string|max:100',
                'indirizzo' => 'nullable|string|max:255',
                'città' => 'nullable|string|max:100',
            ]);

            $filiale = Filiale::create($validated);
            return response()->json($filiale, 201);

        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Dati non validi.',
                'details' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Errore interno. Riprova più tardi.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $filiale = Filiale::findOrFail($id);
            $filiale->delete();

            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Filiale non trovata.'], 404);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Errore durante l\'eliminazione.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
