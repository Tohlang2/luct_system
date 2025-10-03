// test.js - Simple test to check if packages load
console.log('Testing package installation...');

try {
    console.log('1. Loading express...');
    const express = require('express');
    console.log('✅ Express loaded successfully');
    
    console.log('2. Loading cors...');
    const cors = require('cors');
    console.log('✅ CORS loaded successfully');
    
    console.log('3. Loading dotenv...');
    const dotenv = require('dotenv');
    console.log('✅ Dotenv loaded successfully');
    
    console.log('4. Loading mysql2...');
    const mysql = require('mysql2');
    console.log('✅ MySQL2 loaded successfully');
    
    console.log('🎉 ALL PACKAGES LOADED SUCCESSFULLY!');
    console.log('Your environment is ready for development.');
    
} catch (error) {
    console.log('❌ ERROR:', error.message);
    console.log('Please install the missing package.');
}