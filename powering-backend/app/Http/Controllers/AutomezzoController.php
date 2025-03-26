<?php

namespace App\Http\Controllers;

use App\Models\Automezzo;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;

class AutomezzoController extends Controller
{
    public function index()
    {
        return response()->json(Automezzo::all());
    }

    public function show($id)
    {
        try {
            $automezzo = Automezzo::findOrFail($id);
            return response()->json($automezzo);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Automezzo non trovato.'], 404);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'codice' => 'required|string|max:50',
                'targa' => 'required|string|max:20',
                'marca' => 'required|string|max:50',
                'modello' => 'required|string|max:50',
                'filiale_id' => 'required|integer|exists:filiali,id',
            ]);

            $automezzo = Automezzo::create($validated);
            return response()->json($automezzo, 201);

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
            $automezzo = Automezzo::findOrFail($id);
            $automezzo->delete();

            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Automezzo non trovato.'], 404);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Errore durante l\'eliminazione.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
