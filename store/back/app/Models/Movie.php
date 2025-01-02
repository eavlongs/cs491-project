<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;
    protected $fillable = [
        'mb_id',
        'genres',
        'age_restriction',
        'title',
        'description',
        'poster_url',
        'video_url',
        'director',
        'writers',
        'cast',
        'release_date',
        'movie_duration',
        'trailer_url',
        'rent_price',
        'sale_price',
    ];

    protected $hidden = [
        "video_url"
    ];
}
