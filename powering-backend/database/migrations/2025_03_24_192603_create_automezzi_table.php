<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('automezzi', function (Blueprint $table) {
            $table->id();
            $table->string('codice')->unique();
            $table->string('targa')->unique();
            $table->string('marca');
            $table->string('modello');
            $table->foreignId('filiali_id')->constrained("filiali")->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('automezzi');
    }
};
