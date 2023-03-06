//
//  ShareViewController.swift
//  Share
//
//  Created by Dariusz Zabrzeński on 16/02/2023.
//

import UIKit
import Social
import UniformTypeIdentifiers


class ShareViewController: UIViewController, UIPickerViewDataSource, UIPickerViewDelegate {
    @IBOutlet weak var SharedImage: UIImageView!
    @IBOutlet weak var Categories: UIPickerView!
    @IBOutlet weak var ShareButton: UIButton!
    @IBOutlet weak var CancelButton: UIButton!
    @IBOutlet weak var TextInput: UITextField!
    var categoriesSource: [Category]!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        loadImage()
        feedPicker()
        ShareButton.addTarget(self, action: #selector(didShareButtonClick), for: .touchUpInside)
        CancelButton.addTarget(self, action: #selector(didCancelButtonClick), for: .touchUpInside)
    }
    
    @objc func didCancelButtonClick(_ sender: UIButton) {
        self.extensionContext?.cancelRequest(withError: CancellationError())
    }
    
    @objc func didShareButtonClick(_ sender: UIButton) {
        let categoryId = self.categoriesSource[self.Categories.selectedRow(inComponent: 0)].id
        let sdm = ShareDataManager()
        let uiImage = self.SharedImage.image!
        let filmeManager = FileManager()
        let data = uiImage.jpegData(compressionQuality: 1.0)?.base64EncodedString() ?? ""
        
        sdm.write(image: "data:image/jpeg;base64,\(data)", text: self.TextInput.text!, categoryId: categoryId)
        self.extensionContext?.completeRequest(returningItems: [], completionHandler: nil)
    }
    
    func loadImage() {
        let attachments = (self.extensionContext?.inputItems.first as? NSExtensionItem)?.attachments ?? []
        let imageType = UTType.jpeg.identifier as String

        for provider in attachments {
            if provider.hasItemConformingToTypeIdentifier(imageType) {
                provider.loadItem(forTypeIdentifier: imageType,
                                  options: nil) { (data, error) in
                    guard error == nil else { return }
                    
                    if let imageURL = data as? NSURL {
                        DispatchQueue.main.async {
                            self.SharedImage.image = UIImage(contentsOfFile: imageURL.path!)
                        }
                    }
                }
            }
        }
    }
    
    func feedPicker() {
        let cm = CategoriesManager()
        categoriesSource = cm.get().items
        Categories.dataSource = self
        Categories.delegate = self
    }
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {return 1}
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int  {return categoriesSource.count}
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? { return categoriesSource[row].text}
}
