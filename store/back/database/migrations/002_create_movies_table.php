<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('mb_id');
            $table->string('movie_type');
            $table->integer('age_restriction')->nullable();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('poster_url')->nullable();
            $table->string('video_url')->nullable();
            $table->string('director')->nullable();
            $table->string('writers')->nullable();
            $table->string('cast')->nullable();
            $table->date('release_date')->nullable();
            $table->integer('movie_duration')->nullable();
            $table->string('trailer_url')->nullable();
            $table->decimal('price', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
