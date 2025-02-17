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
            $table->string('mb_id')->unique();
            $table->string('genres');
            $table->string('age_restriction');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('poster_url');
            $table->string('video_url');
            $table->string('directors');
            $table->string('cast');
            $table->date('release_date');
            $table->integer('movie_duration');
            $table->string('trailer_url');
            $table->decimal('buy_price', 10, 2);
            $table->decimal('rent_price', 10, 2);
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
