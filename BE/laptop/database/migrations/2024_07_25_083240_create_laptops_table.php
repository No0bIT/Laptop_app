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
        Schema::create('laptops', function (Blueprint $table) {
            $table->id();
            
            $table->string('name');
            $table->integer('price');
            $table->integer('sale_price');
            $table->integer('quantity');
            $table->string('model');
            $table->string('main_image');
            $table->decimal('width');
            $table->decimal('height');
            $table->decimal('weight');
            $table->string('ram');
            $table->string('system');
            $table->decimal('width_screen');
            $table->decimal('height_screen');
            $table->integer('fps_max');
            $table->integer('resolution_max');
            $table->string('cpu');
            $table->string('gpu');
            $table->string('storage');
            $table->string('pin');
            $table->string('wifi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laptops');
    }
};
