<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovieRenting extends Model
{
    use HasFactory;
    protected $fillable = [
        'movie_id',
        'user_id',
        'starts_at',
        'ends_at'
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
    ];
}
