import 'package:flutter/material.dart';

void main() {
  runApp(const HomesphereApp());
}

class HomesphereApp extends StatelessWidget {
  const HomesphereApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Homesphere Home Services',
      theme: ThemeData(colorSchemeSeed: Colors.indigo, useMaterial3: true),
      home: const MarketplaceHomeScreen(),
    );
  }
}

class MarketplaceHomeScreen extends StatelessWidget {
  const MarketplaceHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final modules = ['Salon', 'Electrician', 'Hardware', 'Cleaning', 'Plumbing', 'AC Repair'];
    return Scaffold(
      appBar: AppBar(title: const Text('Homesphere Home Services')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const Text('AI Recommended Services', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          Wrap(
            spacing: 12,
            runSpacing: 12,
            children: modules.map((module) => Chip(label: Text(module))).toList(),
          ),
          const SizedBox(height: 24),
          const Card(
            child: ListTile(
              title: Text('Book, shop, track, pay, review'),
              subtitle: Text('Customer, provider, influencer, franchise, and admin workflows share one marketplace core.'),
            ),
          ),
        ],
      ),
    );
  }
}
