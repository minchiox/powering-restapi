<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Filiale extends Model
{
    use HasFactory;

    protected $table = 'filiali';

    protected $fillable = ['codice', 'indirizzo', 'citta', 'cap'];

    public function automezzi()
    {
        return $this->hasMany(Automezzo::class);
    }
}
